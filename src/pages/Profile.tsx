import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { User, Mail, MapPin, Calendar, Save, LogOut, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getLessons } from "@/api/lessons";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [totalLessons, setTotalLessons] = useState(0);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessons = await getLessons();
        setTotalLessons(lessons.length);
      } catch (error) {
        console.error("Failed to load lessons:", error);
      }
    };
    loadLessons();
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio || "",
      location: user.location || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-4xl px-4 py-32">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Profile</h1>
              <p className="text-muted-foreground mt-2">Manage your account settings</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {getJoinedDate(user.joinedDate)}</span>
                </div>
                {user.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {JSON.parse(localStorage.getItem("completedLessons") || "[]").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {(() => {
                      const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]").length;
                      return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
                    })()}%
                  </div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {new Date(user.joinedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                  <div className="text-sm text-muted-foreground">Member Since</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">⭐</div>
                  <div className="text-sm text-muted-foreground">Achievement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

