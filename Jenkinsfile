pipeline {
    agent { label 'docker-ci-stage' }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    triggers {
        pollSCM 'H/5 * * * *'
    }

    parameters {
        booleanParam(
            name: 'FORCE_BUILD',
            defaultValue: false,
            description: 'builds triggered automatically only for dev/master branches and tags'
        )
        booleanParam(
            name: 'DEPLOY',
            defaultValue: true,
            description: 'deploy only for dev unless FORCE_BUILD is set'
        )
        choice(
            name: 'ENV',
            choices: ['dev', 'stage'],
            description: 'environment to deploy'
        )
        string(
            name: "NODE_TAG",
            defaultValue: '20',
            description: 'node image tag for building artifact'
        )
    }

    environment {
        SERVICE_NAME = "oauth2-client"
        DOCKER_IMAGE_NAME = "${env.SERVICE_NAME}"
        TAG = generateContainerImageTag.baseTag()
        TAG_UNIQUE = generateContainerImageTag.uniqueTag()
        TAG_DEPLOY = generateContainerImageTag.deployTag()
        APPLICATION_VERSION = sendBuildNotifications.getApplicationVersionFromJson()
        ARTIFACTORY_REPO = getArtifactoryRepo()
        ARTIFACT_NAME = 'oauth2-client'
    }

    stages {

        stage('Build') {
            when {
                anyOf {
                    branch pattern: 'dev|master|\\d+\\.\\d+\\.\\d+', comparator: 'REGEXP'
                    expression { params.FORCE_BUILD }
                }
            }

            steps {
                script {
                    IMAGE = docker.build(
                        "gtdevteam/${env.DOCKER_IMAGE_NAME}:${env.TAG}",
                        "--build-arg VERSION=${env.APPLICATION_VERSION} " +
                        "--build-arg NODE_TAG=${params.NODE_TAG} " +
                        "--progress plain " +
                        "."
                    )

                    pushContainerImage(IMAGE)

                    IMAGE.withRun("--name extract-from-${env.TAG_UNIQUE}") { c ->
                        sh "docker cp extract-from-${env.TAG_UNIQUE}:/app/*.tgz ./package.tgz"
                    }

                    sh "mkdir dist"
                    sh "cp package.tgz dist/"
                    sh "tar -czf ${env.ARTIFACT_NAME}.tar.gz dist/"

                    rtUpload(
                        serverId: 'artifactory-server',
                        spec: """{
                            "files": [
                                {
                                    "pattern": "${env.ARTIFACT_NAME}.tar.gz",
                                    "target": "${env.ARTIFACTORY_REPO}/com/npm/${env.ARTIFACT_NAME}/${env.ARTIFACT_NAME}.tar.gz",
                                    "props": "type=tgz;status=ready"
                                },
                                {
                                    "pattern": "${env.ARTIFACT_NAME}.tar.gz",
                                    "target": "${env.ARTIFACTORY_REPO}/com/npm/${env.ARTIFACT_NAME}/${env.APPLICATION_VERSION}/${env.ARTIFACT_NAME}-${env.APPLICATION_VERSION}.tar.gz",
                                    "props": "type=tgz;status=ready"
                                }
                            ]
                        }"""
                    )

                    removeContainerImage(IMAGE.id)
                    setBuildDescription(env.TAG_UNIQUE)
                }
            }

            post {
                always { sendBuildNotifications("build") }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    expression { params.FORCE_BUILD && params.DEPLOY }
                }
            }
            steps {
                script {
                    build(
                        job: "deploy_${env.SERVICE_NAME}",
                        parameters: [
                            string(name: 'TAG', value: env.TAG_DEPLOY),
                            string(name: 'ENV', value: params.ENV)
                        ]
                    )
                }
            }
        }
    }

    post {
        cleanup { cleanWs() }
    }
}
