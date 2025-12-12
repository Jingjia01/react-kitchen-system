import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group"

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="shrink-0">
            <span className="text-xl font-semibold text-gray-900">Ramsay Kitchen</span>
          </div>

          <div className="flex-1 flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate("/open")}
                size="sm"
              >
                Open
              </Button>
              <ButtonGroupSeparator />
              <Button
                variant="outline"
                onClick={() => navigate("/complete")}
                size="sm"
              >
                Complete
              </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="aizen.webp" alt="Sosuke Aizen" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span className="text-gray-900 font-medium">Sosuke Aizen</span>
          </div>
        </div>
      </div>
    </header>
  );
}