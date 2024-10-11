class IWalletServiceProvider{
    async createWallet(createWalletDto){
            throw new Error("Method 'createWallet()' must be implemented.");     
    }
    // async getBalance()
    // async getTransaction()
    // async transfer()
}

module.exports = IWalletServiceProvider;