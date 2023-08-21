import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './InfoAlert.scss';
export default function InfoAlert() {
  return (
    <div className="info-alert">
      <FiAlertCircle className="info-alert__icon" />
      <p className="info-alert__text">Twoja lista faktur jest pusta!</p>
    </div>
  );
}
