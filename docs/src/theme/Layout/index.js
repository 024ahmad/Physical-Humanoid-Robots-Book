import React from 'react';
import Layout from '@theme-original/Layout';
import ChatbotWrapper from '@site/src/components/ChatbotWrapper';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <ChatbotWrapper />
    </>
  );
}
