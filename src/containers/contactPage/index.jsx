import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HELP_EMAIL } from '../../constants';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import style from '../wordpress/style.module.scss';
import { sendContactEmail } from '../../lib/sendContactEmail';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null); // 'sending', 'success', 'error'
  const [submitError, setSubmitError] = useState('');

  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !pattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setEmailError('');
    setSubmitStatus(null);
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setSubmitStatus('sending');
    setSubmitError('');
    try {
      await sendContactEmail({ name, email, subject, message });
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err.message || 'Network error. Please try again later.');
    }
  };

  return (
    <div>
      <HeadMetaTags title="Contact Us" />
      <div className={style.contactMenuContainer}>
        <div className="container-fluid">
          <div className={style.secondaryNavEmptyRow}></div>
          <div className={`row ${style.secondaryNav}`}>
            <div className="container">
              <h1>Contact Us</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-12">
            <p>
              Have a question or need help? &nbsp;&nbsp;Fill out the form below and we will get back to you as soon as
              possible.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="contact-name">Name</label>
                <input
                  className="form-control"
                  id="contact-name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  value={name}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="contact-email">Email</label>
                <input
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  id="contact-email"
                  onBlur={(e) => validateEmail(e.target.value)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  required
                  type="email"
                  value={email}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  className="form-control"
                  id="contact-subject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  type="text"
                  value={subject}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  className="form-control"
                  id="contact-message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="6"
                  value={message}
                />
              </div>
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  disabled={submitStatus === 'sending'}
                  style={{ marginRight: '3rem' }}
                  type="submit"
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send'}
                </button>
                <button
                  className="btn btn-primary"
                  disabled={submitStatus === 'sending'}
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </button>
              </div>
              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  Your message has been sent successfully. We will get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && <div className="alert alert-danger">{submitError}</div>}
            </form>
            <p className="mb-5">
              To email the Alliance of Genome Resources directly: <a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
