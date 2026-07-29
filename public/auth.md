# auth.md — ConectaOne Agent Registration

ConectaOne welcomes AI agents, LLMs, and autonomous tools to explore our public innovation ecosystem, services, and documentation.

## Public Access (No Authentication Required)

The following resources are publicly accessible without authentication:

- Homepage: `https://conectaone.com/`
- LLMs Summary: `https://conectaone.com/llms.txt`
- LLMs Full Documentation: `https://conectaone.com/llms-full.txt`
- AI Policy: `https://conectaone.com/ai.txt`
- API Catalog: `https://conectaone.com/.well-known/api-catalog`
- Agent Skills: `https://conectaone.com/.well-known/agent-skills/index.json`
- MCP Server Card: `https://conectaone.com/.well-known/mcp/server-card.json`
- OpenAPI Spec: `https://conectaone.com/openapi.json`

## Agent Registration

To register as an agent:

1. Review the public resources above — no credentials required for read access.
2. For programmatic requests, identify yourself via HTTP message signatures using our JWKS at `https://conectaone.com/.well-known/http-message-signatures-directory`.
3. Send your registration request or inquiry to: innovation@conectaone.com

## OAuth / Authentication Discovery

- OAuth Protected Resource: `https://conectaone.com/.well-known/oauth-protected-resource`
- OAuth Authorization Server: `https://conectaone.com/.well-known/oauth-authorization-server`
- OpenID Configuration: `https://conectaone.com/.well-known/openid-configuration`

## Supported Identity Methods

- **Anonymous**: HTTP message signatures (http-sig)
- **Identity Assertion**: Verified email

## Contact

- Email: innovation@conectaone.com
- WhatsApp: +55 11 97417-8200
- Website: https://conectaone.com
