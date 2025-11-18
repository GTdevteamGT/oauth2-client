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
        booleanParam(name: 'FORCE_BUILD', defaultValue: false, description: '')
        booleanParam(name: 'DEPLOY', defaultValue: true, description: '')
        choice(name: 'ENV', choices: ['dev', 'stage'], description: '')
        string(name: "NODE_TAG", defaultValue: '20', description: '')
    }

    environment {
        SERVICE_NAME = "oauth2-client"
        DOCKER_IMAGE_NAME = "oauth2-client"
        ARTIFACT_NAME = "oauth2-client"
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
                    APPLICATION_VERSION = sendBuildNotifications.getApplicationVersionFromJson()
                    ARTIFACTORY_REPO = getArtifactoryRepo()
                    TAG = generateContainerImageTag.baseTag()
                    TAG_UNIQUE = generateContainerImageTag.uniqueTag()

                    IMAGE = docker.build(
                        "gtdevteam/${DOCKER_IMAGE_NAME}:${TAG}",
                        "--build-arg VERSION=${APPLICATION_VERSION} " +
                        "--build-arg NODE_TAG=${params.NODE_TAG} " +
                        "--progress plain ."
                    )

                    pushContainerImage(IMAGE)

                    IMAGE.withRun("--name extract-from-${TAG_UNIQUE}") { c ->
                        sh "docker cp extract-from-${TAG_UNIQUE}:/app/*.tgz ./package.tgz"
                    }

                    sh "mkdir dist"
                    sh "cp package.tgz dist/"
                    sh "tar -czf ${ARTIFACT_NAME}.tar.gz dist/"

                    rtUpload(
                        serverId: 'artifactory-server',
                        spec: """{
                            "files": [
                                {
                                    "pattern": "${ARTIFACT_NAME}.tar.gz",
                                    "target": "${ARTIFACTORY_REPO}/com/npm/${ARTIFACT_NAME}/${ARTIFACT_NAME}.tar.gz",
                                    "props": "type=tgz;status=ready"
                                },
                                {
                                    "pattern": "${ARTIFACT_NAME}.tar.gz",
                                    "target": "${ARTIFACTORY_REPO}/com/npm/${ARTIFACT_NAME}/${APPLICATION_VERSION}/${ARTIFACT_NAME}-${APPLICATION_VERSION}.tar.gz",
                                    "props": "type=tgz;status=ready"
                                }
                            ]
                        }"""
                    )

                    removeContainerImage(IMAGE.id)
                    setBuildDescription(TAG_UNIQUE)
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
                    TAG_DEPLOY = generateContainerImageTag.deployTag()

                    build(
                        job: "deploy_${SERVICE_NAME}",
                        parameters: [
                            string(name: 'TAG', value: TAG_DEPLOY),
                            string(name: 'ENV', value: params.ENV)
                        ]
                    )
                }
            }
        }
    }

    post {
        cleanup {
            node('docker-ci-stage') {
                cleanWs()
            }
        }
    }
}
