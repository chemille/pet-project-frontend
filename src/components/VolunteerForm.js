import { useForm } from "react-hook-form";
import { BsEmojiGrimaceFill, BsMailbox } from "react-icons/bs";

const VolunteerForm = () => {
    const { 
        register, 
        handleSubmit,
        setError, 
        formState: {errors, isSubmitting} 
    } = useForm({
        defaultValues: {
            email: "youremail@gmail.com"
        }
    }); //To set default values for your form fields, you can add a defaultValues object in useForm
    //You don't have to set a default value for every field, just the ones you want.
    
    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));  
            throw new Error();
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "This email is already taken",
            });
        }
    }

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

