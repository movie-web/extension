import { useStorage } from '@plasmohq/storage/hook';
import { useState } from 'react';

import { DEFAULT_DOMAIN_WHITELIST } from '~utils/storage';

function IndexPopup() {
  const [domainInput, setDomainInput] = useState('');
  const [domainWhiteist, setDomainWhitelist] = useStorage<string[]>(
    'domainWhitelist',
    (v) => v ?? DEFAULT_DOMAIN_WHITELIST,
  );

  const [error, setError] = useState<string | null>(null);

  const handleDomainSubmit = () => {
    try {
      const origin = new URL(domainInput).origin;
      setDomainWhitelist([...domainWhiteist, origin]);
      setDomainInput('');
    } catch (e) {
      setError('Invalid domain');
    }
  };

  return (
    <div style={{ width: 300 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ flexGrow: 1 }}>movie-web</h1>

        <h3>v{chrome.runtime.getManifest().version}</h3>
      </div>

      <h2 style={{ marginTop: 0 }}>Domains</h2>

      <div>
        <div>
          <input type="text" value={domainInput} onChange={(e) => setDomainInput(e.target.value)} />
          <button type="button" onClick={handleDomainSubmit}>
            Save
          </button>
        </div>
        {error && <span style={{ fontWeight: 'bold' }}>{error}</span>}
        <table>
          <tbody>
            {domainWhiteist.map((domain) => (
              <tr key={domain}>
                <td>{domain}</td>
                <td>
                  <button type="button" onClick={() => setDomainWhitelist(domainWhiteist.filter((d) => d !== domain))}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IndexPopup;
