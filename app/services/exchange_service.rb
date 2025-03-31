class ExchangeService
  EXCHANGE_FEE_RATE = 0.03
  NETWORK_FEE = 0.000006

  def initialize(params)
    @amount_usdt = params[:amount_usdt].to_f
    @recipient_address = params[:recipient_address]
    @email = params[:email]
    @kyc_accepted = params[:kyc_accepted]
    @exchange_rate = fetch_exchange_rate
  end

  def perform
    return { success: false, errors: validate } unless valid?

    exchange = Exchange.new(
      amount_usdt: @amount_usdt,
      amount_sbtc: calculate_sbtc_amount,
      recipient_address: @recipient_address,
      email: @email,
      exchange_fee: calculate_exchange_fee,
      network_fee: NETWORK_FEE,
      status: 'pending'
    )

    if exchange.save
      exchange.update(
        txid: "demo-txid-#{exchange.id}-#{Time.now.to_i}",
        status: 'success'
      )
      {
        success: true,
        you_send: exchange.amount_usdt,
        you_get: exchange.amount_sbtc,
        recipient_address: exchange.recipient_address,
        network_fee: exchange.network_fee,
        exchange_fee: exchange.exchange_fee,
        txid: exchange.txid
      }
    else
      { success: false, errors: exchange.errors.messages }
    end
  end

  private

  def validate
    errors = {}
    errors[:amount_usdt] = 'Maximum 30 USDT' if @amount_usdt > 30
    errors[:recipient_address] = 'Invalid address' unless @recipient_address.present?
    errors[:email] = 'Invalid email' unless @email.present? && @email.match(URI::MailTo::EMAIL_REGEXP)
    errors[:kyc_accepted] = 'Must accept KYC/AML' unless @kyc_accepted
    errors
  end

  def calculate_sbtc_amount
    (@amount_usdt * (1 - EXCHANGE_FEE_RATE) * @exchange_rate) - NETWORK_FEE
  end

  def calculate_exchange_fee
    @amount_usdt * EXCHANGE_FEE_RATE
  end

  def fetch_exchange_rate
    response = HTTParty.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=btc')
    response['tether']['btc'].to_f
  rescue
    0.000015
  end
end
