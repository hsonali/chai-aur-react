import { useCallback, useEffect, useRef, useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";

    if (charAllowed) str += "!@#$%^&*()_+={}[]<>,./?`~;:";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
      <h1>Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="default-range"
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer"
          ></input>

          <label
            htmlFor="default-range"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Length: {length}
          </label>

          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            value=""
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
          />
          <label
            htmlFor="default-checkbox"
            className="select-none ms-2 text-sm font-medium text-heading"
          >
            Numbers
          </label>

          <input
            type="checkbox"
            id="charInput"
            defaultChecked={charAllowed}
            value=""
            onChange={() => setCharAllowed((prev) => !prev)}
            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
          />
          <label
            htmlFor="default-checkbox"
            className="select-none ms-2 text-sm font-medium text-heading"
          >
            Characters
          </label>
        </div>
      </div>
    </>
  );
}
