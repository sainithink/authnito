"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
class CognitoAuth {
    constructor(config) {
        this.client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({ region: config.region });
        this.clientId = config.clientId;
        this.mandatoryField = config.mandatoryField;
    }
    async signUp(username, password, attributeValue) {
        const params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [
                {
                    Name: this.mandatoryField,
                    Value: attributeValue,
                },
            ],
        };
        const command = new client_cognito_identity_provider_1.SignUpCommand(params);
        await this.client.send(command);
    }
    async confirmSignUp(username, confirmationCode) {
        const params = {
            ClientId: this.clientId,
            Username: username,
            ConfirmationCode: confirmationCode,
        };
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand(params);
        await this.client.send(command);
    }
    async forgotPassword(username) {
        const params = {
            ClientId: this.clientId,
            Username: username,
        };
        const command = new client_cognito_identity_provider_1.ForgotPasswordCommand(params);
        await this.client.send(command);
    }
    async confirmForgotPassword(username, confirmationCode, newPassword) {
        const params = {
            ClientId: this.clientId,
            Username: username,
            ConfirmationCode: confirmationCode,
            Password: newPassword,
        };
        const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand(params);
        await this.client.send(command);
    }
}
exports.default = CognitoAuth;
