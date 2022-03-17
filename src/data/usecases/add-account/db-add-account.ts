
import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    // pega a propriedade password e altera ela para password encryptografado(hashedPassword)//
    // as duas {} na frente garante que vai criar objeto sem sobescrever a propriedade password//
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    const fakeAccount = {
      id: 'valid_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    return await new Promise(resolve => resolve(fakeAccount))
  }
}