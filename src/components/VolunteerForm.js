import { useForm } from "react-hook-form";

const VolunteerForm = () => {
    const { 
        register, 
        handleSubmit,
        setError, 
        formState: {errors, isSubmitting} 
    } = useForm({
        defaultValues: {
            email: "your_email@email.com",
        },
    }); 

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));  
            // throw new Error(); // This is causing an error when submitting the form.
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
            <input {...register("firstName", {required: "First name is required",})} type="text" placeholder="First Name" />
            {errors.firstName && (<div className="text-red-500">{errors.firstName.message}</div>)}
            <input {...register("lastName", {required: "Last name is required", minLength: 2,})} type="text" placeholder="Last Name" />
            {errors.lastName && (<div className="text-red-500">{errors.lastName.message}</div>)}
            
            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Submit Form"}</button>
            {errors.root && (<div className="text-red-500">{errors.root.message}</div>)}
        </form>
    );
};

export default VolunteerForm;

