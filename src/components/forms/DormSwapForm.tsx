import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui";
import * as z from 'zod';

// Define your validation schema with Zod
const DormSwapFormSchema = z.object({
  currentDormName: z.string().nonempty({ message: "Please select your current dorm name." }),
  desiredDormName: z.string().nonempty({ message: "Please select your desired dorm name." }),
  roomNumber: z.string().nonempty({ message: "Please enter your room number." }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  notes: z.string().optional(),
});

// Define the types for the form
type DormSwapFormData = z.infer<typeof DormSwapFormSchema>;

const dormNameOptions = [
    { value: "West Campus", label: "West Campus" },
    { value: "Warren Towers", label: "Warren Towers" },
    { value: "Myles Standish Hall", label: "Myles Standish Hall" },
    { value: "Kilachand Hall", label: "Kilachand Hall" },
    { value: "The Towers", label: "The Towers" },
    { value: "1019 Commonwealth Avenue", label: "1019 Commonwealth Avenue" },
    { value: "Danielsen Hall", label: "Danielsen Hall" },
    { value: "575 Commonwealth Avenue (HOJO)", label: "575 Commonwealth Avenue (HOJO)" },
    { value: "East & Central Campus Brownstones", label: "East & Central Campus Brownstones" },
    { value: "South Campus Brownstones", label: "South Campus Brownstones" },
    { value: "Bay State Road Brownstones", label: "Bay State Road Brownstones" },
    { value: "East Campus Apartments", label: "East Campus Apartments" },
    { value: "South Campus Apartments", label: "South Campus Apartments" },
    { value: "Student Village 1", label: "Student Village 1" },
    { value: "Student Village 2", label: "Student Village 2" },
    { value: "Riverway House", label: "Riverway House" },
    { value: "Pilgrim House", label: "Pilgrim House" },
    { value: "Longwood House", label: "Longwood House" }
];

const DormSwapForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DormSwapFormData>({
    resolver: zodResolver(DormSwapFormSchema)
  });

  const onSubmit: SubmitHandler<DormSwapFormData> = data => {
    // Here you would handle the form submission, e.g., sending data to an API
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  {/* Current Dorm Name */}
  <div>
    <label htmlFor="currentDormName" className="form-label">Current Dorm Name</label>
    <select 
      id="currentDormName" 
      {...register('currentDormName')} 
      className="form-select"
    >
      {dormNameOptions.map(option => (
        <option value={option.value} key={option.value}>{option.label}</option>
      ))}
    </select>
    {errors.currentDormName && <p className="form-error">{errors.currentDormName.message}</p>}
  </div>

  {/* Desired Dorm Name */}
  <div>
    <label htmlFor="desiredDormName" className="form-label">Desired Dorm Name</label>
    <select
      id="desiredDormName"
      {...register('desiredDormName')}
      className="form-select"
    >
      <option value="">Select desired dorm</option>
      {dormNameOptions.map(option => (
        <option value={option.value} key={option.value}>{option.label}</option>
      ))}
    </select>
    {errors.desiredDormName && <p className="form-error">{errors.desiredDormName.message}</p>}
  </div>

  {/* Room Number */}
  <div>
    <label htmlFor="roomNumber" className="form-label">Room Number</label>
    <input 
      id="roomNumber" 
      {...register('roomNumber')} 
      type="text" 
      className="form-input" 
      placeholder="Room number"
    />
    {errors.roomNumber && <p className="form-error">{errors.roomNumber.message}</p>}
  </div>

  {/* Contact Number */}
  <div>
    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
    <input
      id="contactNumber"
      type="text"
      {...register('contactNumber')}
      className="form-input"
      placeholder="Your contact number"
    />
    {errors.contactNumber && <p className="form-error">{errors.contactNumber.message}</p>}
  </div>

  {/* Email */}
  <div>
    <label htmlFor="email" className="form-label">Email</label>
    <input 
      id="email" 
      {...register('email')} 
      type="email" 
      className="form-input" 
      placeholder="Email address"
    />
    {errors.email && <p className="form-error">{errors.email.message}</p>}
  </div>

  {/* Notes */}
  <div>
    <label htmlFor="notes" className="form-label">Additional Notes</label>
    <textarea 
      id="notes" 
      {...register('notes')} 
      className="form-textarea" 
      placeholder="Any additional information"
    />
  </div>

  {/* Submit Button */}
  <div>
    <Button type="submit" className="form-submit-btn">Submit Request</Button>
  </div>
</form>
  );
};

export default DormSwapForm;
