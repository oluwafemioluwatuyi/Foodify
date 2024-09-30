const AppStatusCodes = {
    Success: '0000',
    BvnNotVerified: '0001',
    EmailNotVerified: '0002',
    NoLinkedWallet: '0003',
    InvalidCredentials: '0004',
    InvalidVerificationToken: '0005',
    ResourceNotFound: '0010',
    Unauthorized: '0012',
    InternalServerError: '9999'
};

module.exports = AppStatusCodes;
