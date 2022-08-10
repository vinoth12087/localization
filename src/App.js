import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEffect, useState } from "react";

const li = [
  { code: 'fr', name: 'français' },
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'عربى' }
]

function App() {
  const { t } = useTranslation()
  const [cond, setCond] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadComplete, setLoadComplete] = useState(false)

  useEffect(() => {
    document.title = t('app_title')
  }, [t])

  useEffect(() => {
    isLoggedIn()
  }, [])

  async function isLoggedIn() {
    const data = await fetch('http://localhost:8080/api/user/get', { credentials: 'include' })
    const res = await data.json()
    if (res.message === 'success') {
      setCond(true)
    }
    setLoadComplete(true)
  }

  async function login() {
    const obj = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    const data = await fetch('http://localhost:8080/api/user/login', obj)
    const res = await data.json()
    if (res.message === "success") {
      setCond(true)
      setLoadComplete(true)
    }
  }

  async function logout() {
    const obj = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const data = await fetch('http://localhost:8080/api/user/logout', obj)
    const res = await data.json()
    if (res.message === "success") {
      setCond(false)
    }
  }

  return (<>
    {cond && loadComplete && <div className="App">
      <h1>{t('welcome_message')}</h1>
      <p>{t('days_since_release', { number_of_days: 100 })}</p>
      <h2>{t('language')}</h2>
      {li.map(i => {
        return <div style={{ margin: 10 }}><button onClick={() => i18next.changeLanguage(i.code)}>{i.name}</button></div>
      })}
      <button style={{ marginTop: 30 }} onClick={() => logout()}>LOGOUT</button>
    </div>}
    {!cond && loadComplete && <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      height: '90vh',
    }}>
      <input
        type={'email'}
        placeholder="Email"
        style={{ margin: 5, height: 20, width: '20%' }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={'password'}
        placeholder="Password"
        style={{ margin: 5, height: 20, width: '20%' }}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? login() : ''}
      />
      <button style={{ margin: 5 }} onClick={() => login()}>Submit</button>
    </div>}
    {!loadComplete && <h1>Loading...</h1>}
  </>);
}

export default App;
