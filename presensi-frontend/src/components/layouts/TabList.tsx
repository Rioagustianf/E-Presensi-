import { TabsContent } from "@/components/ui/tabs";

export const TabListLayout = (props: {
  value: string;
  children: React.ReactNode;
}) => {
  const { value, children } = props;

  return (
    <TabsContent value={value} className="space-y-4">
      {children}
    </TabsContent>
  );
};
