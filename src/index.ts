import {
    CognitoIdentityProviderClient,
    SignUpCommand,
    ConfirmSignUpCommand,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand,
  } from "@aws-sdk/client-cognito-identity-provider";
  
  interface CognitoConfig {
    region: string;
    clientId: string;
    mandatoryField: 'email' | 'phone_number';
  }
  
  class CognitoAuth {
    private client: CognitoIdentityProviderClient;
    private clientId: string;
    private mandatoryField: 'email' | 'phone_number';
  
    constructor(config: CognitoConfig) {
      this.client = new CognitoIdentityProviderClient({ region: config.region });
      this.clientId = config.clientId;
      this.mandatoryField = config.mandatoryField;
    }
  
    async signUp(username: string, password: string, attributeValue: string): Promise<void> {
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
      const command = new SignUpCommand(params);
      await this.client.send(command);
    }
  
    async confirmSignUp(username: string, confirmationCode: string): Promise<void> {
      const params = {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
      };
      const command = new ConfirmSignUpCommand(params);
      await this.client.send(command);
    }
  
    async forgotPassword(username: string): Promise<void> {
      const params = {
        ClientId: this.clientId,
        Username: username,
      };
      const command = new ForgotPasswordCommand(params);
      await this.client.send(command);
    }
  
    async confirmForgotPassword(username: string, confirmationCode: string, newPassword: string): Promise<void> {
      const params = {
        ClientId: this.clientId,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
      };
      const command = new ConfirmForgotPasswordCommand(params);
      await this.client.send(command);
    }
  }
  
  export default CognitoAuth;
  