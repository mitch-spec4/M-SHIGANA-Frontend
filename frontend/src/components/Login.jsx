import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './login.css'
import { AuthContext } from '../App'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setErrors({ submit: errorData.message || 'Login failed' })
          setSubmitting(false)
          return
        }

        const result = await response.json()
        // // Store user and token in localStorage or context as needed
        // localStorage.setItem('user', JSON.stringify(result.user))
        // localStorage.setItem('token', result.token)

        // // Call login from context to update global state
        // login(result.user, result.token)

         // Save token
         localStorage.setItem('token', result.access_token)
         localStorage.setItem('user', JSON.stringify(result.user))
                // save wallet info if returned
         localStorage.setItem('wallet', JSON.stringify(result.wallet))
 
         // Update global login state
         login(result.user, result.access_token, result.wallet) // or pass actual user object if backend provides one

        // Navigate based on role
        if (result.user.role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/wallet')
        }
        // navigate(result.redirect_to || '/wallet')
      } catch (error) {
        console.error('Login error:', error)
        setErrors({ submit: 'Login failed. Check credentials.' })
      } finally {
        setSubmitting(false)
      }
    },
  })

  const handleSignupClick = () => {
    navigate('/register')
  }

  return (
    <div className="log-container">
      <div className="l-container">
        <h2>Login Form</h2>
        <div className="screen_log">
          <div className="screen__content">
            <form onSubmit={formik.handleSubmit} className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="login__input"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              {formik.errors.submit && <div className="error">{formik.errors.submit}</div>}

              <button type="submit" className="button login__submit" disabled={formik.isSubmitting}>
                <span className="button__text">{formik.isSubmitting ? 'Logging in...' : 'Log In'}</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <button type="button" onClick={handleSignupClick} className="button login__submit">
                <span className="button__text">Sign up Instead</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
