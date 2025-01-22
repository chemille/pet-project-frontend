
import { useForm } from "react-hook-form";
// useForm hook is more scalable 

const VolunteerForm = () => {
    //Register function is going to help us connect inputs and html elements for them to be able to work with the form. 
    //So we destructure the form variable and use the register function on the inputs.
    //We register with the inputs to work with the react hook form.
    //const form = useForm();
    const { register, handleSubmit, formState: {errors} } = useForm();
    //handleSubmit from react hook forms will handle the default behavior of the form as well as handle the validating inputs for us.
    //To display errors to users, you can use the formState from the useForm hook. 
    //formState is an object you can destructure and get access to the errors

    //Define onSubmit function
    const onSubmit = (data) => {
        console.log(data);
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
            <button type="submit">Submit Form</button>
        </form>
    );
};

export default VolunteerForm;

