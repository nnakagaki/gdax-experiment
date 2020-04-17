import React, { useState, useEffect } from 'react';
import createAuthedClient from './createAuthedClient';

export default function() {
  const authedClient = createAuthedClient(window.authObject);

  authedClient.getCoinbaseAccounts().then((result) => {
    console.log(result)
  });

  return (
    <div />
  )
}
