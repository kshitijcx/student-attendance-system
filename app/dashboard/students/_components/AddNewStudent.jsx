"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addStudent, getAllGrades, getAllStudents } from "@/app/_services/globalAPIs";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const AddNewStudent = ({refreshData}) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const resp = addStudent(data).then((response) => response);
    if (resp) {
      setOpen(false);
      refreshData();
      toast("New Student Added");
      getAllStudents().then((resp) => setStudentList(resp.data));
      reset();
    }
  };

  const getGradesList = () => {
    getAllGrades().then((resp) => setGrades(resp.data));
  };

  useEffect(() => {
    getGradesList();
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="Ex. Ramesh Kumar"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((grade, idx) => (
                      <option key={idx} value={grade.grade}>
                        {grade.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input
                    placeholder="Ex. 1234567890"
                    type="number"
                    {...register("contact", { required: true })}
                  />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    placeholder="Ex. 12 Flower Garden, HP"
                    {...register("address", { required: true })}
                  />
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>{loading ? <Loader className="animate-spin"/> : 'Save'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddNewStudent;
