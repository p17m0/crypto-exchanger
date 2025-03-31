class CreateExchanges < ActiveRecord::Migration[8.0]
  def change
    create_table :exchanges do |t|
      t.decimal :amount_usdt
      t.decimal :amount_sbtc
      t.string :recipient_address
      t.string :email
      t.decimal :exchange_fee
      t.decimal :network_fee
      t.string :txid
      t.string :status

      t.timestamps
    end
  end
end
