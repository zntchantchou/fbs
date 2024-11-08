"use client";

import { useState } from "react";
import Header from "@/app/(components)/Header";
import { setIsDarkMode } from "@/state";
import { useAppDispatch } from "@/app/redux";

type userSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: userSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "johndoe@mail.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];
function Settings() {
  const [userSettings, setUserSettings] = useState<userSetting[]>(mockSettings);
  const dispatch = useAppDispatch();
  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    const updatedItem = settingsCopy[index];
    updatedItem.value = !settingsCopy[index].value;
    if (updatedItem.label === "Dark mode") {
      dispatch(setIsDarkMode(updatedItem.value as boolean));
    }
    setUserSettings(settingsCopy);
  };
  const toggleElt = (value: boolean, index: number) => (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value as boolean}
        onChange={() => handleToggleChange(index)}
      />
      <div
        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:bg-blue-600"
      ></div>
    </label>
  );

  const inputElt = (setting: userSetting, index: number) => (
    <input
      type="text"
      className="px-4 p-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
      value={setting.value as string}
      onChange={(e) => {
        const settingsCopy = [...userSettings];
        settingsCopy[index].value = e.target.value;
        setUserSettings(settingsCopy);
      }}
    />
  );

  return (
    <div className="w-full">
      <Header name="User settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle"
                    ? toggleElt(setting.value as boolean, index)
                    : inputElt(setting, index)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;
