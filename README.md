# Email Parser API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-UNLICENSED-gray.svg)](LICENSE)

## 📋 Description

Email Parser API is a backend application developed with **NestJS** that provides services for email processing and analysis. The API includes two main functionalities:

1. **Email Parser**: Processes .eml files, extracts JSON attachments, uploads them to a pastebin, and generates a new email file with the link.
2. **Mapper**: Transforms Amazon SES email data into a simplified and structured format.

## ✨ Features

- 🔧 **NestJS Framework**: Modular and scalable architecture
- 📊 **Swagger Documentation**: Automatic API documentation
- 🔄 **AutoMapper**: Automatic object mapping with `@automapper/classes`
- ✅ **Validation**: Data validation with `class-validator`
- 📧 **Email Processing**: Support for .eml files with `mailparser`
- 🌐 **Pastebin Integration**: Automatic JSON file upload
- 📝 **TypeScript**: Development with static typing

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/noriega2112/email-parser-api.git
cd email-parser-api
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables** (optional)

```bash
# Create .env file if needed
PORT=3000
```

## 🏃‍♂️ Execution

### Development

```bash
# Development mode with hot reload
pnpm run start:dev

# Debug mode
pnpm run start:debug
```

### Production

```bash
# Build the project
pnpm run build

# Run in production mode
pnpm run start:prod
```

### Other Commands

```bash
# Run in normal mode
pnpm run start

# Format code
pnpm run format

# Linting
pnpm run lint
```

## 📚 API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

## 🔌 API Endpoints

### 1. Email Parser

#### `POST /email-parser/parse`

Processes an email file (.eml), extracts JSON attachments, uploads them to a pastebin, and returns the path of the newly generated file.

**Request Body:**

```json
{
  "source": "https://example.com/email.eml"
}
```

**Response:**

```json
{
  "newFilePath": "/path/to/your/project/processed-1678886400000.eml"
}
```

**Response Codes:**

- `201`: Email processed successfully
- `400`: Bad Request
- `404`: JSON attachment not found
- `500`: Internal Server Error

### 2. Mapper

#### `POST /mapper`

Transforms Amazon SES email data into a simplified format.

**Request Body:**

```json
{
  "Records": [
    {
      "ses": {
        "receipt": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "processingTimeMillis": 222,
          "spamVerdict": { "status": "PASS" },
          "virusVerdict": { "status": "PASS" },
          "spfVerdict": { "status": "PASS" },
          "dkimVerdict": { "status": "PASS" },
          "dmarcVerdict": { "status": "PASS" }
        },
        "mail": {
          "timestamp": "2015-09-11T20:32:33.936Z",
          "source": "sender@example.com",
          "destination": ["recipient@example.com"]
        }
      }
    }
  ]
}
```

**Response:**

```json
{
  "spam": false,
  "virus": false,
  "dns": true,
  "mes": "septiembre",
  "retrasado": false,
  "emisor": "sender",
  "receptor": ["recipient"]
}
```

## 📁 Project Structure

```
src/
├── app.controller.ts          # Main controller
├── app.module.ts             # Main application module
├── app.service.ts            # Main service
├── main.ts                   # Application entry point
├── email-parser/             # Email processing module
│   ├── dto/
│   │   └── parse-email.dto.ts
│   ├── email-parser.controller.ts
│   ├── email-parser.module.ts
│   └── email-parser.service.ts
└── mapper/                   # Data mapping module
    ├── dto/
    │   ├── incoming-ses.dto.ts
    │   └── processed-email.dto.ts
    ├── mapper.controller.ts
    ├── mapper.module.ts
    ├── mapper.profile.ts
    └── mapper.service.ts
```

## 🔧 Technologies Used

### Main Dependencies

- **@nestjs/common**: NestJS framework
- **@nestjs/swagger**: API documentation
- **@automapper/classes**: Automatic object mapping
- **mailparser**: .eml file processing
- **nodemailer**: Email handling
- **axios**: HTTP client
- **class-validator**: Data validation

### Development Dependencies

- **@nestjs/cli**: NestJS CLI
- **@nestjs/testing**: Testing utilities
- **jest**: Testing framework
- **eslint**: Linting
- **prettier**: Code formatting
- **typescript**: TypeScript compiler

## 📖 Usage Examples

### Example 1: Process an Email

```bash
curl -X POST http://localhost:3000/email-parser/parse \
  -H "Content-Type: application/json" \
  -d '{
    "source": "https://example.com/sample.eml"
  }'
```

### Example 2: Map SES Data

```bash
curl -X POST http://localhost:3000/mapper \
  -H "Content-Type: application/json" \
  -d @sample.json
```

## 🚀 Deployment

### Local Deployment

```bash
# Build for production
pnpm run build

# Run
pnpm run start:prod
```

### Environment Variables

- `PORT`: Port on which the application will run (default: 3000)

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license. See the `LICENSE` file for more details.

## 🆘 Support

If you have any questions or need help, you can:

- Review the Swagger documentation at `/api`
- Open an issue in the repository
- Contact the development team

## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Swagger Documentation](https://swagger.io/docs/)
- [AutoMapper Documentation](https://automapper.netlify.app/)
- [MailParser Documentation](https://nodemailer.com/extras/mailparser/)

---

Developed with ❤️ using NestJS
