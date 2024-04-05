import React, { useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const URLShortner = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [tinyURL, setTinyURL] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/shorten-url`, {
        originalURL: originalURL
      });
      setError('')
      setTinyURL(response.data.tinyURL)
    } catch (error: any) {
      setTinyURL('')
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>Enter the URL to shorten</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="originalURL">URL</label> <br /> <br />
        <input
          type="text"
          id="originalURL"
          name="originalURL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          style={{ width: '500px', height: '40px' }}
        />
        <br /> <br />
        <button type="submit">Shorten</button>
      </form>
      <a href=""></a>
      {tinyURL && <p>Tiny URL:  <a href={tinyURL} target='_blank'>{tinyURL}</a></p>}
      {
        tinyURL &&
        <CopyToClipboard text={tinyURL} >
          <button>Copy to Clipboard</button>
        </CopyToClipboard>
      }

    </div>
  );
};

export default URLShortner;
