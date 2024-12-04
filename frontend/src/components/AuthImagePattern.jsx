import PropTypes from 'prop-types';


const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="auth-pattern-container">
      <div className="auth-pattern-content">
        <div className="auth-pattern-grid">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`auth-pattern-square ${i % 2 === 0 ? 'auth-pattern-animate' : ''}`}
            />
          ))}
        </div>
        <h2 className="auth-pattern-title">{title}</h2>
        <p className="auth-pattern-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

AuthImagePattern.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthImagePattern;

