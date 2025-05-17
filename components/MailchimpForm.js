import { useEffect } from "react";

export default function MailchimpForm({ isOpen, onClose }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">✖</button>
        <div id="mc_embed_signup">
          <form 
            action="https://media.us3.list-manage.com/subscribe/post?u=d3f8a406a389c71ccbbf270da&amp;id=ba568ed03d" 
            method="post" 
            id="mc-embedded-subscribe-form" 
            name="mc-embedded-subscribe-form" 
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <h2>Subscribe</h2>
              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">First Name</label>
                <input type="text" name="FNAME" id="mce-FNAME" />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address *</label>
                <input type="email" name="EMAIL" required id="mce-EMAIL" />
              </div>
              <div className="clear">
                <input type="submit" name="subscribe" value="Subscribe" className="bg-black text-white px-4 py-2 mt-2 rounded cursor-pointer hover:bg-gray-800" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
