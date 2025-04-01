# == Schema Information
#
# Table name: exchanges
#
#  id                :integer          not null, primary key
#  amount_sbtc       :decimal(, )
#  amount_usdt       :decimal(, )
#  email             :string
#  exchange_fee      :decimal(, )
#  network_fee       :decimal(, )
#  recipient_address :string
#  status            :string
#  txid              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
require "test_helper"

class ExchangeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
