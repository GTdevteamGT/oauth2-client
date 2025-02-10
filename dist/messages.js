var OAuth2ResponseType;
(function (OAuth2ResponseType) {
    OAuth2ResponseType["Code"] = "code";
    OAuth2ResponseType["Token"] = "token";
})(OAuth2ResponseType || (OAuth2ResponseType = {}));
var OAuth2ResponseMode;
(function (OAuth2ResponseMode) {
    OAuth2ResponseMode["Query"] = "query";
    OAuth2ResponseMode["Fragment"] = "fragment";
})(OAuth2ResponseMode || (OAuth2ResponseMode = {}));
var OAuth2GrantType;
(function (OAuth2GrantType) {
    OAuth2GrantType["AuthorizationCode"] = "authorization_code";
    OAuth2GrantType["Implicit"] = "implicit";
    OAuth2GrantType["Password"] = "password";
    OAuth2GrantType["ClientCredentials"] = "client_credentials";
    OAuth2GrantType["RefreshToken"] = "refresh_token";
    OAuth2GrantType["JWTBearer"] = "urn:ietf:params:oauth:grant-type:jwt-bearer";
    OAuth2GrantType["SAML2Bearer"] = "urn:ietf:params:oauth:grant-type:saml2-bearer";
})(OAuth2GrantType || (OAuth2GrantType = {}));
var OAuth2AuthMethod;
(function (OAuth2AuthMethod) {
    OAuth2AuthMethod["None"] = "none";
    OAuth2AuthMethod["ClientSecretBasic"] = "client_secret_basic";
    OAuth2AuthMethod["CLientSecretPost"] = "client_secret_post";
    OAuth2AuthMethod["ClientSecretJWT"] = "client_secret_jwt";
    OAuth2AuthMethod["PrivateKeyJWT"] = "private_key_jwt";
    OAuth2AuthMethod["TLSClientAuth"] = "tls_client_auth";
    OAuth2AuthMethod["SSTLSClientAuth"] = "self_signed_tls_client_auth";
})(OAuth2AuthMethod || (OAuth2AuthMethod = {}));
;
var OAuth2CodeChallengeMethod;
(function (OAuth2CodeChallengeMethod) {
    OAuth2CodeChallengeMethod["S256"] = "S256";
    OAuth2CodeChallengeMethod["Plain"] = "plain";
})(OAuth2CodeChallengeMethod || (OAuth2CodeChallengeMethod = {}));
export var OAuth2TokenTypeHint;
(function (OAuth2TokenTypeHint) {
    OAuth2TokenTypeHint["AccessToken"] = "access_token";
    OAuth2TokenTypeHint["RefreshToken"] = "refresh_token";
})(OAuth2TokenTypeHint || (OAuth2TokenTypeHint = {}));
;
//# sourceMappingURL=messages.js.map