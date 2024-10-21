const MonnifyWalletProviderService = require('./MonnifyWalletProviderService');

class WalletService {
    constructor(){
        this.monnifyWalletProviderService = MonnifyWalletProviderService;
    }

     async createUserWallet(CreateWalletDto) {
        const { WalletReference,WalletName,CustomerName,CustomerEmail, bvn,Nin, UserId,CurrencyCode} = CreateWalletDto;

        const createWalletDto = {
            WalletReference: `wallet-${user.id}`,  // Reference for the wallet
            WalletName: `${firstName} ${lastName}'s Wallet`, 
            CustomerName: `${firstName} ${lastName}`,
            CustomerEmail: email, 
            BvnDetails: {
                Bvn: bvn,  
            },
            Nin: NIN,  
            CurrencyCode: 'NGN',  
        };

        try {
            
            const walletResponse = await this.monnifyWalletProviderService.createWallet(createWalletDto);

            // Check if wallet creation was successful
            if (!walletResponse || !walletResponse.accountNumber) {
                throw new Error('Failed to create wallet');
            }

            return walletResponse;  // Return the created wallet details (e.g., account number, etc.)

        } catch (error) {
            console.error('Error creating wallet:', error);
            throw new Error('Error creating wallet');
        }
    }
}

module.exports = WalletService;