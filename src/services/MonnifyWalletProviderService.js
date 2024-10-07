const MonnifyClient = require('../clients/MonnifyClient');
const IWalletServiceProvider = require('../interface/IWalletProviderService')

class MonnifyWalletProviderService extends IWalletServiceProvider{

    constructor(){
        super();
        this.monnifyClient = new MonnifyClient()     
    }

    async createWallet(createWalletDto){
        const response = await this.monnifyClient.post('/api/v1/disbursements/wallet', createWalletDto);
        return response.data;
    }
    
}

module.exports = MonnifyWalletProviderService;
