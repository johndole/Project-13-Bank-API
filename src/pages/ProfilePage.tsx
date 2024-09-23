import React, { useEffect, useState } from "react"
import { useAuth } from "../store/hooks/useAuth"

import { User } from "../types"
import BankAccountDetails from "../components/ui/BankAccountDetails"

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName || "")

  const handleUpdateProfile = async () => {
    const updatedUser: Partial<User> = { firstName, lastName }
    if (!updatedUser.firstName || !updatedUser.lastName) {
      return alert("Please enter first and last name")
    }
    await updateProfile(updatedUser)
  }
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="profile">
      <div className="profile-content">
        <h2>Welcome back</h2>
        <div className="profile-edit">
          <div className="profile-inputs">
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder={
                user?.firstName ? capitalizeFirstLetter(user.firstName) : ""
              }
            />
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder={
                user?.lastName ? capitalizeFirstLetter(user.lastName) : ""
              }
            />
          </div>
          <div className="profile-buttons">
            <button onClick={handleUpdateProfile}>Save</button>
            <button
              onClick={() => {
                setFirstName("")
                setLastName("")
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <main>
          <BankAccountDetails
            accountTitle={"Argent Bank Checking (x8349)"}
            accountAmount={1802.35}
            accountAmountDesciption={"Available Balance"}
            onClick={() => console.log("Checking transactions clicked")}
          />
          <BankAccountDetails
            accountTitle={"Argent Bank Savings (x6712)"}
            accountAmount={10872.14}
            accountAmountDesciption={"Available Balance"}
            onClick={() => console.log("Savings transactions clicked")}
          />
          <BankAccountDetails
            accountTitle={"Argent Bank Credit Card (x5201)"}
            accountAmount={1200.25}
            accountAmountDesciption={"Current Balance"}
            onClick={() => console.log("Creditcard transactions clicked")}
          />
        </main>
      </div>
    </div>
  )
}

export default Profile
