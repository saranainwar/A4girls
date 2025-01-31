import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExampleCard() {
  return (
    <Card className="max-w-sm mx-auto p-4 shadow-lg">
      <CardHeader>
        <CardTitle>ShadCN Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">This is an example of a ShadCN card component.</p>
        <Button className="mt-4 w-full">Click Me</Button>
      </CardContent>
    </Card>
  );
}
