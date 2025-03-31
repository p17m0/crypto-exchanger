class Exchange < ApplicationRecord
  validates :amount_usdt, presence: true, numericality: { less_than_or_equal_to: 30 }
  validates :recipient_address, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :status, inclusion: { in: %w[pending success fail] }
end
