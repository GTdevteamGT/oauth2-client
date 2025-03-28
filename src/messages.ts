/**
 * refresh_token request body
 */
export interface RefreshRequest {
  grant_type: 'refresh_token';
  refresh_token: string;

  client_id?: string;
  scope?: string;

  /**
   * The resource  the client intends to access.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc8707
   */
  resource?: string | string[];
}

/**
 * client_credentials request body
 */
export interface ClientCredentialsRequest {
  grant_type: 'client_credentials';
  scope?: string;

  /**
   * The resource  the client intends to access.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc8707
   */
  resource?: string | string[];

  [key: string]: string | undefined | string[];
}

/**
 * password grant_type request body
 */
export interface PasswordRequest {
  grant_type: 'password';
  username: string;
  password: string;
  scope?: string;

  /**
   * The resource  the client intends to access.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc8707
   */
  resource?: string | string[];
}

export interface AuthorizationCodeRequest {
  grant_type: 'authorization_code';
  code: string;
  redirect_uri: string;
  code_verifier: string|undefined;

  /**
   * The resource  the client intends to access.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc8707
   */
  resource?: string | string[];
}

/**
 * Response from the /token endpoint
 */
export interface TokenResponse {
  external: {
    access_token: string;
    expires_in: number;
    token_type: string;
  },
  internal: {
    access_token: string;
    expires_in: number;
    token_type: string;
  },
}

enum OAuth2ResponseType {
  Code = 'code',
  Token = 'token',
}
enum OAuth2ResponseMode {
  Query = 'query',
  Fragment = 'fragment',
}
enum OAuth2GrantType {
  AuthorizationCode = 'authorization_code',
  Implicit = 'implicit',
  Password = 'password',
  ClientCredentials = 'client_credentials',
  RefreshToken = 'refresh_token',
  JWTBearer = 'urn:ietf:params:oauth:grant-type:jwt-bearer',
  SAML2Bearer = 'urn:ietf:params:oauth:grant-type:saml2-bearer',
}
enum OAuth2AuthMethod {
  None = 'none',
  ClientSecretBasic = 'client_secret_basic',
  CLientSecretPost = 'client_secret_post',
  ClientSecretJWT = 'client_secret_jwt',
  PrivateKeyJWT = 'private_key_jwt',
  TLSClientAuth = 'tls_client_auth',
  SSTLSClientAuth = 'self_signed_tls_client_auth',
};
enum OAuth2CodeChallengeMethod {
  S256 = 'S256',
  Plain = 'plain',
}

export enum OAuth2TokenTypeHint {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
}

/**
 * Response from /.well-known/oauth-authorization-server
 *
 * https://datatracker.ietf.org/doc/html/rfc8414
 */
export interface ServerMetadataResponse {
  /**
   * The authorization server's issuer identifier, which is a URL that uses
   * the "https" scheme and has no query or fragment.
   */
  issuer: string;

  /**
   * URL of the authorization server's authorization endpoint.
   */
  authorization_endpoint:string;

  /**
   * URL of the authorization server's token endpoint.
   */
  token_endpoint: string;

  /**
   * URL of the authorization server's JWK Set document
   */
  jwks_uri?: string;

  /**
   * URL of the authorization server's OAuth 2.0 Dynamic Client Registration
   * endpoint.
   */
  registration_endpoint?: string;

  /**
   * List of supported scopes for this server
   */
  scopes_supported?: string[];

  /**
   * List of supported response types for the authorization endpoint.
   *
   * If 'code' appears here it implies authorization_code support,
   * 'token' implies support for implicit auth.
   */
  response_types_supported: OAuth2ResponseType[];

  /**
   * JSON array containing a list of the OAuth 2.0 "response_mode"
   * values that this authorization server supports
   */
  response_modes_supported?: OAuth2ResponseMode[];

  /**
   * List of supported grant types by the server
   */
  grant_types_supported?: OAuth2GrantType[];

  /**
   * Supported auth methods on the token endpoint.
   */
  token_endpoint_auth_methods_supported?: OAuth2AuthMethod[];

  /**
   * JSON array containing a list of the JWS signing algorithms.
   */
  token_endpoint_auth_signing_alg_values_supported?: string[];

  /**
   * URL of a page containing human-readable information that developers might want or need to know when using the authorization server.
   */
  service_documentation?: string;

  /**
   * List of supported languages for the UI
   */
  ui_locales_supported?: string[];

  /**
   * URL that the authorization server provides to the person registering the
   * client to read about the authorization server's requirements on how the
   * client can use the data provided by the authorization server.
   */
  op_policy_uri?: string;

  /**
   * Link to terms of service
   */
  op_tos_uri?: string;

  /**
   * Url to servers revocation endpoint.
   */
  revocation_endpoint?: string;

  /**
   * Auth method that may be used on the revocation endpoint.
   */
  revocation_endpoint_auth_methods_supported?: OAuth2AuthMethod[];

  /**
   * JSON array containing a list of the JWS signing algorithms ("alg" values)
   * supported by the revocation endpoint.
   */
  revocation_endpoint_auth_signing_alg_values_supported?: string[];

  /**
   * Url to introspection endpoint
   */
  introspection_endpoint?: string;

  /**
   * List of authentication methods supported on the introspection endpoint.
   */
  introspection_endpoint_auth_methods_supported?: OAuth2AuthMethod[];

  /**
   * List of JWS signing algorithms supported on the introspection endpoint.
   */
  introspection_endpoint_auth_signing_alg_values_supported?: string[];

  /**
   * List of support PCKE code challenge methods.
   */
  code_challenge_methods_supported?: OAuth2CodeChallengeMethod[];

}

export interface IntrospectionRequest {
  token: string;
  token_type_hint?: OAuth2TokenTypeHint;
};


export interface IntrospectionResponse {
  /**
   * Whether or not the token is still active.
   */
  active: boolean;

  /**
   * Space-separated list of scopes.
   */
  scope?: string;

  /**
   * client_id that requested the token.
   */
  client_id?: string;

  /**
   * Human-readable string of the resource-owner that requested the token.
   */
  username?: string;

  /**
   * Type of token
   */
  token_type?: string;

  /**
   * Unix timestamp of when this token expires.
   */
  exp?: number;

  /**
   * Unix timestamp of when the token was issued.
   */
  iat?: number;

  /**
   * Unix timestamp indicating when the token should not be used before.
   */
  nbf?: number;

  /**
   * Subject of the token. Usually a machine-readable identifier of the
   * resource owner/user.
   */
  sub?: string;

  /**
   * String representing the audience of the token.
   */
  aud?: string;

  /**
   * Issuer of the token.
   */
  iss?: string;

  /**
   * String identifier of the token.
   */
  jti?: string;
}

/**
 * Revocaton request.
 *
 * https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
 */
export interface RevocationRequest {
  token: string;
  token_type_hint?: OAuth2TokenTypeHint;
  headers?: Record<string, string>;
}

export type OAuth2ErrorCode =
  | 'invalid_request'
  | 'invalid_client'
  | 'invalid_grant'
  | 'unauthorized_client'
  | 'unsupported_grant_type'
  | 'invalid_scope'

  /**
   * RFC 8707
   */
  | 'invalid_target';
