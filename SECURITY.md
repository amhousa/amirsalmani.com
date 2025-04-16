# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to [info@amirsalmani.com](mailto:info@amirsalmani.com). All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- Type of vulnerability
- Steps to reproduce
- Affected versions
- Potential impact

## Security Measures

This project implements several security measures:

1. **Authentication**: Secure OTP-based authentication system
2. **API Rate Limiting**: Protection against brute force attacks
3. **Input Validation**: Thorough validation of all user inputs
4. **HTTPS**: All communications are encrypted
5. **Environment Variables**: Sensitive information is stored in environment variables
6. **Regular Updates**: Dependencies are regularly updated to patch security vulnerabilities

## Best Practices for Contributors

When contributing to this project, please follow these security best practices:

1. Never commit sensitive information (API keys, passwords, etc.)
2. Always validate user input
3. Use parameterized queries for database operations
4. Follow the principle of least privilege
5. Keep dependencies updated

