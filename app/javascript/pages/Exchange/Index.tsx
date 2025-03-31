import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import styles from './Index.module.scss'; // Импорт модуля стилей

interface Props {
  exchange_rate: number;
  max_usdt: number;
  errors: Record<string, string>;
}

export default function ExchangeIndex({ exchange_rate, max_usdt, errors }: Props) {
  const { data, setData, post, processing } = useForm({
    exchange: {
      amount_usdt: '',
      recipient_address: '',
      email: '',
      kyc_accepted: false,
    },
  });

  const [amountSbtc, setAmountSbtc] = useState(0);

  useEffect(() => {
    const usdt = parseFloat(data.exchange.amount_usdt) || 0;
    const sbtc = (usdt * (1 - 0.03) * exchange_rate) - 0.000006;
    setAmountSbtc(sbtc > 0 ? sbtc.toFixed(8) : 0);
  }, [data.exchange.amount_usdt, exchange_rate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/exchanges');
  };

  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <span className={styles.bannerText}>Crypto Exchanger</span>
        <span className={styles.bannerText}>Exchange Now!</span>
      </div>
      <form className={styles.cardForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.cardTitle}>You send (USDT)</label>
          <input
            type="number"
            value={data.exchange.amount_usdt}
            onChange={(e) => setData('exchange', { ...data.exchange, amount_usdt: e.target.value })}
            max={max_usdt}
          />
          {errors.amount_usdt && <div className={styles.errorMessage}>{errors.amount_usdt}</div>}
        </div>
        <div>
          <label className={styles.cardTitle}>You get (sBTC)</label>
          <input type="number" value={amountSbtc} readOnly />
        </div>
        <div>
          <label className={styles.cardTitle}>Recipient address</label>
          <input
            type="text"
            value={data.exchange.recipient_address}
            onChange={(e) => setData('exchange', { ...data.exchange, recipient_address: e.target.value })}
          />
          {errors.recipient_address && (
            <div className={styles.errorMessage}>{errors.recipient_address}</div>
          )}
        </div>
        <div>
          <label className={styles.cardTitle}>E-mail address</label>
          <input
            type="email"
            value={data.exchange.email}
            onChange={(e) => setData('exchange', { ...data.exchange, email: e.target.value })}
          />
          {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={data.exchange.kyc_accepted}
            onChange={(e) => setData('exchange', { ...data.exchange, kyc_accepted: e.target.checked })}
          />
          <label>I agree with KYC/AML terms</label>
          {errors.kyc_accepted && <div className={styles.errorMessage}>{errors.kyc_accepted}</div>}
        </div>
        <button type="submit" className={styles.signUp} disabled={processing}>
          Exchange Now
        </button>
      </form>
    </div>
  );
}
