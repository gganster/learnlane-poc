
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Settings = (props) => {
  return (
    <div>
      <Alert>
        <AlertTitle className="flex items-center" style={{gap: 10}}>
          <AlertTriangle />
          <span>Danger zone</span>
        </AlertTitle>
        <AlertDescription className="mt-5">
          <Button variant="destructive">Delete room</Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default Settings;