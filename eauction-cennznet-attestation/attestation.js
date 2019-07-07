//the cennznet/api
const {Api} = require('@cennznet/api')
const {Attestation} = require('@cennznet/crml-attestation')


//wallet
const {SimpleKeyring, Wallet} = require('@cennznet/wallet')
const { stringToU8a } = require('@cennznet/util')
const simpleKeyring = new SimpleKeyring();
const wallet = new Wallet();


//relate ACCOUNT
const issuer = {
  address: '5EFbnfmQHvb4eerM51tWKRu6UPpukmWHe1gbq6HNwrVwGUTH',
  seed: stringToU8a('0x91dad6d121e35654b92356ec9c3b8c8d6df22013bae50871a873bc29d3e09874'),
};


const holder = {
  address: '5FeUe6cUX6qEKdcv1Uryy2mue9JDksfr3GTukq6m8omh81uf',
  seed: stringToU8a('0xabc9771d9575ad6ded66a36728937eeb438b8f661ed2fa6ce267122ab7a2d0b6'),
};


async function main() {
  simpleKeyring.addFromSeed(issuer.seed);
  const api = await Api.create({
    provider: 'wss://mx-eauction-eauction.ap1.onfinality.io',
  });
  const passphrase = 'AUCTION 1';
  await wallet.createNewVault(passphrase);
  await wallet.addKeyring(simpleKeyring);
  api.setSigner(wallet);
  const attestation = new Attestation(api);

  const topic = 'LOT 1 - PROPERTY PURCHASE FROM AUCTION';
  const value = 'Agree Price is SGD 100,000';
  const claim = await attestation.setClaim(holder.address, topic, value);

  await claim.signAndSend(issuer.address, async result => {
    if (result.type === 'Finalised' && result.events !== undefined) {
      const { data } = result.events[0].event.toJSON();
      console.log(data);
    }
  });
}
main();