"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { submitLoginAction } from "@/store/action/authAction";
import type { AppDispatch } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [isFormSumbit, setIsFormSumbit] = useState(false);
  const [credintialsState, setCredintialsState] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    gender: "",
    email: "",
    password: "",
    conformPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    password: "",
    conformPassword: "",
    gender: "",
  });

  const validateSignUp = () => {
    const errors = {
      firstName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      password: "",
      conformPassword: "",
      gender: "",
    };

    // Validate first name
    if (!credintialsState.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (!credintialsState.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    // Validate mobile number
    const mobilePattern = /^\d{10}$/;
    if (
      !credintialsState.mobileNo ||
      !mobilePattern.test(credintialsState.mobileNo)
    ) {
      errors.mobileNo = "Please enter a valid 10-digit mobile number";
    }

    // Validate gender
    if (!credintialsState.gender) {
      errors.gender = "Please select a gender";
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credintialsState.email || !emailPattern.test(credintialsState.email)) {
      errors.email = "Please enter a valid email";
    }

    // Validate password
    const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?])[A-Za-z\d@#$%^&*!?]{8,}$/;
    if (!credintialsState.password) {
      errors.password = "Password is required";
    } else if (!passwordPattern.test(credintialsState.password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
    }

    // Validate confirm password
    if (credintialsState.password !== credintialsState.conformPassword) {
      errors.conformPassword = "Passwords do not match";
    }

    setErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: credintialsState.email,
      password: credintialsState.password,
      isSignUp: true,
    };

    let isValid = true;
    isValid = validateSignUp();
    if (!isValid) return;

    await dispatch(submitLoginAction(data));
    setIsFormSumbit(true);
  };

  const handleOtpSubmit = async () => {

    console.log(credintialsState, "SIGNUP data");
    

    // const data = {
    //   credintialsState.email,
    //   credintialsState.otp,
    //   credintialsState.firstName,
    //   credintialsState.lastName,
    //   credintialsState.mobile,
    //   credintialsState.password,
    //   credintialsState.gender,
    // };

    // Dispatch the action with all the necessary data raziqsur@gmail.com
    // dispatch(
    //   submitOtpAction({
    //     email: credintialsState.email,
    //     otp: credintialsState.otp,
        // firstName: credintialsState.firstName,
    //     lastName: credintialsState.lastName,
    //     mobile: credintialsState.mobileNo,
    //     password: credintialsState.password,
    //     gender: credintialsState.gender,
    //   }) as any
    // );
  };

  return (
    <>
      {!isFormSumbit ? (
        <form >
          <div className="flex flex-col gap-6">
            <div className="grid gap-3 content-center items-center justify-center mt-4">
              <Label htmlFor="email" className="text-center justify-center">
                OTP
              </Label>
              <InputOTP 
                maxLength={6} 
                className="w-full" 
                value={credintialsState.otp} 
                onChange={(value) => setCredintialsState({ ...credintialsState, otp: value })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex flex-col gap-3">
              <Button 
                type="submit" 
                className="w-full"
                onClick={() => {
                  console.log("form submit");
                  // e.preventDefault();
                  handleOtpSubmit();
                }}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 mt-4">
              <div className="grid gap-3 relative">
                <Label htmlFor="email">First Name</Label>
                <Input
                  id="firstName"
                  type="firstName"
                  placeholder="your name"
                  required
                  value={credintialsState.firstName}
                  onChange={(e) =>
                    setCredintialsState({
                      ...credintialsState,
                      firstName: e.target.value,
                    })
                  }
                />
                <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                  {errors.firstName}
                </span>
              </div>

              <div className="grid gap-3 relative">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="lastName"
                  type="lastName"
                  placeholder="last name"
                  required
                  value={credintialsState.lastName}
                  onChange={(e) =>
                    setCredintialsState({
                      ...credintialsState,
                      lastName: e.target.value,
                    })
                  }
                />
                <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                  {errors.lastName}
                </span>
              </div>
            </div>
            <div className="grid gap-3 relative">
              <Label htmlFor="email">Mobile No</Label>
              <Input
                id="mobileNo"
                type="mobileNo"
                placeholder="mobile no"
                required
                value={credintialsState.mobileNo}
                onChange={(e) =>
                  setCredintialsState({
                    ...credintialsState,
                    mobileNo: e.target.value,
                  })
                }
              />
              <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                {errors.mobileNo}
              </span>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Gender</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="eg. mail" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">mael</SelectItem>
                  <SelectItem value="dark">femael</SelectItem>
                  <SelectItem value="system">others</SelectItem>
                </SelectContent>
              </Select>
              <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                {errors.gender}
              </span>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={credintialsState.email}
                onChange={(e) =>
                  setCredintialsState({
                    ...credintialsState,
                    email: e.target.value,
                  })
                }
              />
              <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                {errors.email}
              </span>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={credintialsState.password}
                onChange={(e) =>
                  setCredintialsState({
                    ...credintialsState,
                    password: e.target.value,
                  })
                }
              />
              <span className="absolute -bottom-5 left-1 text-sm text-red-400">
                {errors.password}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default SignupForm;
