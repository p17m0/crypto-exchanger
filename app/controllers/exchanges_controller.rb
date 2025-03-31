class ExchangesController < ApplicationController
  def index
    render inertia: 'Exchange/Index', props: {
      exchange_rate: fetch_exchange_rate,
      max_usdt: 30.0,
      errors: flash[:errors] || {}
    }
  end

  def create
    exchange_service = ExchangeService.new(exchange_params)
    result = exchange_service.perform

    if result[:success]
      render inertia: 'Exchange/Success', props: result
    else
      flash[:errors] = result[:errors]
      redirect_to exchanges_path
    end
  end

  private

  def exchange_params
    params.require(:exchange).permit(:amount_usdt, :recipient_address, :email, :kyc_accepted)
  end

  def fetch_exchange_rate
    response = HTTParty.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=btc')
    response['tether']['btc'].to_f
  rescue
    0.000015
  end
end
