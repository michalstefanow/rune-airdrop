# Bitcoin Rune Airdrop

A TypeScript-based implementation for managing Bitcoin Rune token airdrops. This project provides a secure and efficient way to distribute Rune tokens to multiple recipients.

## Features

- Batch token distribution
- Merkle tree verification
- Gas optimization
- Multi-wallet support
- Transaction monitoring
- Error handling and retries

## Prerequisites

- Node.js (v14 or higher)
- Web3 provider (e.g., Infura)
- MetaMask or similar wallet
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone https://github.com/michalstefanow/rune-airdrop.git
cd rune-airdrop
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
- Network RPC URL
- Private keys for distribution wallets
- Token contract address

## Development

1. Compile TypeScript:
```bash
npm run build
```

2. Run tests:
```bash
npm test
```

3. Start distribution:
```bash
npm start
```

## Project Structure

```
rune-airdrop/
├── src/
│   ├── index.ts           # Main entry point
│   ├── airdrop.ts         # Airdrop logic
│   ├── merkle.ts          # Merkle tree implementation
│   └── utils.ts           # Utility functions
├── test/
│   └── airdrop.test.ts    # Test cases
└── config/
    └── config.ts          # Configuration
```

## Airdrop Process

1. **Preparation**
   - Generate Merkle tree from recipient list
   - Verify token balances
   - Check gas prices

2. **Distribution**
   - Batch transactions
   - Monitor confirmations
   - Handle failures

3. **Verification**
   - Track successful transfers
   - Generate distribution report
   - Verify Merkle proofs

## Security

1. **Transaction Security**
   - Gas price monitoring
   - Nonce management
   - Transaction confirmation checks

2. **Data Security**
   - Encrypted private keys
   - Secure configuration
   - Access control

## Monitoring

1. **Transaction Monitoring**
   - Real-time status updates
   - Error tracking
   - Gas usage statistics

2. **Distribution Analytics**
   - Success rate tracking
   - Cost analysis
   - Performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Telegram: [@michalstefanow](https://t.me/mylord1_1)
- Twitter: [@michalstefanow](https://x.com/michalstefanow)

