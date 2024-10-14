class TopUpAccountDetail {
    constructor(bankName = null, accountNumber = null, accountName = null) {
        this.BankName = bankName;
        this.AccountNumber = accountNumber;
        this.AccountName = accountName;
    }
}

class CreateWalletResponseDto {
    constructor() {
        this.AccountNumber = null;
        this.WalletReference = null;
        this.AccountName = null;
        this.FeeBearer = null;
        this.BVN = null;
        this.BVNDateOfBirth = null;
        this.CustomerEmail = null;
        this.CustomerName = null;
       // this.TopUpAccountDetails = []; // Initialize as an empty array to avoid null references
    }
}
