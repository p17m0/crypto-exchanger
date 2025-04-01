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
class Exchange < ApplicationRecord
  validates :amount_usdt, presence: true, numericality: { less_than_or_equal_to: 30 }
  validates :recipient_address, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :status, inclusion: { in: %w[pending success fail] }
end
