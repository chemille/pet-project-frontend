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
            <label htmlFor="firstName">First Name: </label>
            <input {...register("firstName", {required: "First name is required",})} type="text" placeholder="First Name" />
            {errors.firstName && (<div className="text-red-500">{errors.firstName.message}</div>)}
            
            <label htmlFor="lastName">Last Name: </label>
            <input {...register("lastName", {required: "Last name is required", minLength: 2,})} type="text" placeholder="Last Name" />
            {errors.lastName && (<div className="text-red-500">{errors.lastName.message}</div>)}

            <label htmlFor="email">Email: </label>
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
            
            <label htmlFor="phoneNumber">Phone Number: </label> 
            <input {...register("phoneNumber", {required: "Phone number is required", 
                    validate: (value) => {
                        // let isNum = /^\d+$/.test(value);
                        if (value.length !== 10) {
                            return "Phone number must be 10 digits";
                        }
                        if (!/^\d+$/.test(value)) {
                            return "Phone number can only contain numbers"
                        }
                        return true;
                    },
                })} 
                type="text" placeholder="9876543210" />
            {errors.phoneNumber && (<div className="text-red-500">{errors.phoneNumber.message}</div>)}
            
            <label htmlFor="dob">Date of Birth: </label>
            <input {...register("dob", {required: "Date of birth is required", valueAsDate: true,})} type="date" placeholder="Last Name" />
            {errors.dob && (<div className="text-red-500">{errors.dob.message}</div>)}

            <p>What type of volunteering would you like to do?</p>
                <ul>
                    <li>
                    <label htmlFor="field-on-site">
                    <input
                        {...register("volunteerFor")}
                        type="radio"
                        value="on-site"
                        id="field-on-site"
                    />
                    Volunteering on-site
                    </label>
                    </li>
                <li>
                <label htmlFor="field-foster">
                    <input
                        {...register("volunteerFor")}
                        type="radio"
                        value="foster"
                        id="field-foster"
                    />
                    Fostering a pet
                </label>
                </li>
                <li>
                <label htmlFor="field-both">
                    <input
                        {...register("volunteerFor")}
                        type="radio"
                        value="both on-site and foster"
                        id="field-both"
                    />
                    Both on-site and foster care
                </label>                    
                </li>
                </ul>

            <button disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Submit Form"}</button>
            {errors.root && (<div className="text-red-500">{errors.root.message}</div>)}
        </form>
    );
};

export default VolunteerForm;

