export default function Login() {
  return (
    <div>
      <h1>Login Formu</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Şifre" />
        <label>
          <input type="checkbox" /> Şartları kabul ediyorum
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}
