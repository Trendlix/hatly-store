import React, { FC, useState } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import useInput, { InputHookType } from '../../hooks/use-input';
import { toast } from 'react-toastify';
import axios from 'axios';


const isNotEmpty = (value: string) => value.trim() !== '';

const ContactUs: FC = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    onChangeHandler: onChangeNameHandler,
    onBlurHandler: onBlurNameHandler,
    resetInputHandler: resetNameInput
  }: InputHookType = useInput(isNotEmpty);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    onChangeHandler: onChangeEmailHandler,
    onBlurHandler: onBlurEmailHandler,
    resetInputHandler: resetEmailInput
  }: InputHookType = useInput((value: any) => value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/));
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    onChangeHandler: onChangePhoneHandler,
    onBlurHandler: onBlurPhoneHandler,
    resetInputHandler: resetPhoneInput
  }: InputHookType = useInput(isNotEmpty);
  const {
    value: enteredMessage,
    isValid: enteredMessageIsValid,
    hasError: messageHasError,
    onChangeHandler: onChangeMessageHandler,
    onBlurHandler: onBlurMessageHandler,
    resetInputHandler: resetMessageInput
  }: InputHookType = useInput((value: string) => value.length >= 50);

  const ErrorComponent = <p className='pt-1 text-sm text-error flex items-end gap-2'>
    <ErrorOutlineOutlinedIcon style={{ fontSize: '1rem' }} />
    <span>This field is required</span>
  </p>;
  const inputStyle = (validation: boolean) => `block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 duration-250 ${validation === true ? 'bg-input_error focus:border-input_error_shadow focus:ring-input_error_shadow' : ''}`
  const [sendingForm, setSendingForm] = useState(false);
  const sendForm = async (name: string, email: string, phone: string, message: string) => {
    try {
      await axios.post('http://127.0.0.1:3001/api/v1/contact-us', {
        fullName : name,
        email,
        phone,
        message
      })
    } catch (e: any) {
      throw new Error(e);
    }

  }
  let formIsValid = false;
  if (enteredNameIsValid && enteredPhoneIsValid && enteredEmailIsValid && enteredMessageIsValid)
    formIsValid = true;
  const formSubmissionHandler = async (e: any) => {
    //prevent default behavior
    e.preventDefault();
    //touch all inputs
    onBlurNameHandler();
    onBlurEmailHandler();
    onBlurPhoneHandler();
    onBlurMessageHandler();

    if (!formIsValid)
      return;
      //set status to pending to send message
      const formToast = toast.loading("Sending your message...")
    try {
      setSendingForm(prev => true)
      //check that all inputs are valid
      console.log('sending')
      await sendForm(enteredName, enteredPhone, enteredEmail, enteredMessage);
      toast.update(formToast,
        {
          render: "Your message has been sent successfully",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          isLoading: false,
          type: toast.TYPE.SUCCESS,
          closeButton: true,
        }
      )
    } catch (e: any) {
      console.log(2)
      toast.update(formToast,
        {
          render: "Sorry we couldn't send your message",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          isLoading: false,
          type: toast.TYPE.ERROR,
          closeButton: true,
        })
    }
    //set sending message state to false
    setSendingForm(prev => false);
    // reset inputs
    resetNameInput();
    resetEmailInput();
    resetPhoneInput();
    resetMessageInput();
  }
  const redirectToSocialMedia = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <section className="bg-secondary ">
      <div className="container px-6 py-12 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-6">
          <div className="lg:w-1/2 lg:mx-6">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize  lg:text-5xl">
              Contact us for <br /> more info
            </h1>

            <div className="mt-6 space-y-8 md:mt-8">
              <p className="flex items-start -mx-2">
                <PlaceOutlinedIcon className='w-6 h-6 mx-2 text-blue-500 ' />

                <span className="mx-2 text-gray-700 truncate w-72 ">
                  Cecilia Chapman 711-2880 Nulla
                  St. Mankato Mississippi 96522
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>

                <span className="mx-2 text-gray-700 truncate w-72 ">+(971) 543 300 334</span>
              </p>

              <p className="flex items-start -mx-2">
                <MailOutlineRoundedIcon className="w-6 h-6 mx-2 text-blue-500 " />

                <span className="mx-2 text-gray-700 truncate w-72 ">waves.seasons@gmail.com</span>
              </p>
            </div>

            <div className="mt-6 w-80 md:mt-8">
              <h3 className="text-gray-600  ">Follow us</h3>

              <div className="flex mt-4 -mx-1.5 cursor-pointer">
                <span
                  className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  onClick={() => { redirectToSocialMedia('https://www.instagram.com/Waves.seasons/') }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div
              className="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl  lg:max-w-xl shadow-gray-300/50 ">
              <h1 className="text-lg font-medium text-gray-700">What do you want to ask</h1>

              <form className="mt-6" onSubmit={formSubmissionHandler}>
                <div className="flex-1 h-[102px]">
                  <label className="block mb-2 text-sm text-gray-600 ">Full Name</label>
                  <input
                    value={enteredName}
                    onChange={onChangeNameHandler}
                    onBlur={onBlurNameHandler}
                    type="text"
                    placeholder="John Doe"
                    className={inputStyle(nameHasError)}
                  />
                  {
                    nameHasError === true ?
                      ErrorComponent :
                      null
                  }
                </div>

                <div className="flex-1 h-[102px] mt-2">
                  <label className="block mb-2 text-sm text-gray-600 ">Email Address</label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    className={inputStyle(emailHasError)}
                    value={enteredEmail}
                    onChange={onChangeEmailHandler}
                    onBlur={onBlurEmailHandler}
                  />
                  {
                    emailHasError === true ?
                      ErrorComponent :
                      null
                  }
                </div>

                <div className="flex-1 h-[102px] mt-2">
                  <label className="block mb-2 text-sm text-gray-600 ">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+971xxxxxxxxx"
                    className={inputStyle(phoneHasError)}
                    value={enteredPhone}
                    onChange={onChangePhoneHandler}
                    onBlur={onBlurPhoneHandler}
                  />
                  {
                    phoneHasError === true ?
                      ErrorComponent :
                      null
                  }
                </div>

                <div className="w-full mt-2">
                  <label className="block mb-2 text-sm text-gray-600 ">Message</label>
                  <textarea
                    className={`block w-full h-20 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-20  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${messageHasError === true ? 'bg-input_error focus:border-input_error_shadow focus:ring-input_error_shadow' : ''}`}
                    placeholder="Message"
                    value={enteredMessage}
                    onChange={onChangeMessageHandler}
                    onBlur={onBlurMessageHandler}
                  >
                  </textarea>
                  {
                    messageHasError === true ?
                      <p className='pt-1 text-sm text-error flex items-end gap-2'>
                        <ErrorOutlineOutlinedIcon style={{ fontSize: '1rem' }} />
                        <span>Enter 50 characters at least.</span>
                      </p>
                      : null
                  }
                </div>

                <button
                  type='submit'
                  className={`w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${sendingForm === true ? 'bg-blue-400 outline-none ' : ''}`}
                  disabled={!!sendingForm}
                >
                  get in touch
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs