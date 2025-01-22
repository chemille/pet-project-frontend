import { useForm } from "react-hook-form";

const VolunteerForm = () => {
    //Register function is going to help us connect inputs and html elements for them to be able to work with the form. 
    //So we destructure the form variable and use the register function on the inputs.
    //We register with the inputs to work with the react hook form.
    //const form = useForm();
    const { 
        register, 
        handleSubmit,
        setError, 
        formState: {errors, isSubmitting} 
    } = useForm();
    //handleSubmit from react hook forms will handle the default behavior of the form as well as handle the validating inputs for us.
    //To display errors to users, you can use the formState from the useForm hook. 
    
    //formState is an object you can destructure and get access to the errors
    //Another property you can access in the formState besides errors is isSubmitting.
    //isSubmitting is a boolean that will be true when the form is submitting.
    //You can make your submit button unaccessible while the form is submitting.

    //React hook forms has another function called setError.
    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Waits 1 second 
            throw new Error();
            console.log(data);
        } catch (error) {
            //setError("root") is for the error to belong to the whole form rather than one form field such as "email".
            //Then, scroll down to JSX and add {errors.root && <div className="text-red-500">{errors.root.message}</div>
            setError("root", {
                message: "This email is already taken",
            });
        }
    }

    //{...register("email")} can have an optional second parameter for validation. That way you can't submit empty fields
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("email", {
                    required: "Email is required", 
                    validate: (value) => {
                        if (!value.includes("@")) {
                            return "Email must include @";
                        }
                        return true;
                    },
                })} 
                type="text" placeholder="Email" />
            {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
            <input {...register("firstName", {required: "First name is required",})} type="firstName" placeholder="First Name" />
            {errors.firstName && (<div className="text-red-500">{errors.firstName.message}</div>)}
            <input {...register("lastName", {required: "Last name is required", minLength: 2,})} type="lastName" placeholder="Last Name" />
            {errors.lastName && (<div className="text-red-500">{errors.lastName.message}</div>)}
            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Submit Form"}</button>
            {errors.root && (<div className="text-red-500">{errors.root.message}</div>)}
        </form>
    );
};

export default VolunteerForm;

