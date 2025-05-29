// import { useContext, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Loader2, Download, Search, Sparkles, Video, Zap, Play } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"
// import axios from "axios"
// import { AppContext } from "@/context/AppContext"

// function ShortVidGen() {
//   const {token,loadCreditData}=useContext(AppContext)
//   const [query, setQuery] = useState("")
//   const [videos, setVideos] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const handleSearch = async () => {
//     if (!query.trim()) return
//     setLoading(true)
//     setError(null)
//    try {
//     const res = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/aivideo/api/videos?q=${query}`,
//       {
//         headers: {
//           token: token  // or use "Authorization": `Bearer ${token}` if your backend expects that
//         },
       
//       }
//     );

//     if (res.data.success) {
//       setVideos(res.data.videos || []);
//       // loadCreditData()
//     } else {
//       if (res.data.message === "You have no credits left") {
//         navigate("/buycredit");
//       } else {
//         setError(res.data.message || "Failed to fetch videos");
//       }
//     }

//   } catch (err) {
//     const errorMsg = err.response?.data?.message || err.message;
//     if (errorMsg === "You have no credits left") {
//       navigate("/buycredit");
//     } else {
//       setError(errorMsg);
//     }
//   } finally {
//     setLoading(false);
//     loadCreditData()
//   }
//   }

//   const handleReset = () => {
//     setQuery("")
//     setVideos([])
//     setError(null)
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch()
//     }
//   }

//   // Helper to find 720p video file
//   const getVideo720p = (videoFiles) => {
//     return videoFiles.find((file) => file.width === 1280 && file.height === 720 && file.file_type === "video/mp4")
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   }

//   return (
//     <div className="min-h-screen text-white relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10 px-4 py-12">
//         {/* Hero Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="max-w-6xl mx-auto text-center space-y-8 mb-16"
//         >
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//               className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
//             >
//               <Sparkles className="w-8 h-8 text-white" />
//             </motion.div>
//             <Badge
//               variant="secondary"
//               className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20"
//             >
//               AI-Powered Video Discovery
//             </Badge>
//           </div>

//           <motion.h1
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
//             className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-500 to-pink-200 bg-clip-text text-transparent leading-tight"
//           >
//             Create Videos from
//             <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Text Prompts
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
//           >
//             Transform your ideas into stunning videos instantly. Just describe what you want, and our AI will find the
//             perfect high-quality footage for you.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//             className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
//           >
//             <div className="flex items-center gap-2">
//               <Video className="w-5 h-5 text-purple-400" />
//               <span>HD Quality</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Zap className="w-5 h-5 text-yellow-400" />
//               <span>Instant Results</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Download className="w-5 h-5 text-green-400" />
//               <span>Free Downloads</span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Search Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//           className="max-w-2xl mx-auto mb-16"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
//             <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8">
//               <div className="flex flex-col sm:flex-row items-center gap-4">
//                 <div className="relative flex-1 w-full">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Describe your video... (e.g., 'sunset over mountains', 'city traffic at night')"
//                     className="pl-12 h-14 text-lg bg-white/5 border-white/20 text-gray-400 placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>
//                 <Button
//                   onClick={handleSearch}
//                   disabled={loading || !query.trim()}
//                   size="lg"
//                   className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="animate-spin mr-2 w-5 h-5" />
//                       Searching...
//                     </>
//                   ) : (
//                     <>
//                       <Search className="mr-2 w-5 h-5" />
//                       Find Videos
//                     </>
//                   )}
//                 </Button>
//               </div>

//               {videos.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="mt-4 flex justify-center"
//                 >
//                   <Button
//                     variant="outline"
//                     onClick={handleReset}
//                     className="text-red-400 border-red-400/50 hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
//                   >
//                     Clear Results
//                   </Button>
//                 </motion.div>
//               )}
//             </Card>
//           </div>
//         </motion.div>

//         {/* Error State */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="max-w-2xl mx-auto mb-8"
//             >
//               <Card className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
//                 <CardContent className="p-6 text-center">
//                   <p className="text-red-400 text-lg">{error}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Loading State */}
//         <AnimatePresence>
//           {loading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="max-w-6xl mx-auto mb-8"
//             >
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl overflow-hidden">
//                       <div className="w-full h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
//                       <CardContent className="p-6 space-y-3">
//                         <div className="h-4 bg-white/10 rounded animate-pulse"></div>
//                         <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse"></div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Videos Grid */}
//         <AnimatePresence>
//           {videos.length > 0 && (
//             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-white mb-2">Found {videos.length} Amazing Videos</h2>
//                 <p className="text-gray-400">Click to preview, download in HD quality</p>
//               </motion.div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {videos.map((video, index) => {
//                   const video720p = getVideo720p(video.video_files)

//                   return (
//                     <motion.div
//                       key={video.id}
//                       variants={itemVariants}
//                       whileHover={{ y: -10, scale: 1.02 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     >
//                       <Card className="group bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20">
//                         <div className="relative overflow-hidden">
//                           <video
//                             controls
//                             poster={video.image}
//                             className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//                           >
//                             {video720p && <source src={video720p.link} type="video/mp4" />}
//                             {!video720p && <source src={video.video_files[0]?.link} type="video/mp4" />}
//                             Your browser does not support the video tag.
//                           </video>
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/20">
//                               <Play className="w-3 h-3 mr-1" />
//                               HD
//                             </Badge>
//                           </div>
//                         </div>

//                         <CardContent className="p-6 space-y-4">
//                           <div className="flex items-center justify-between">
//                             <Badge
//                               variant="secondary"
//                               className="bg-purple-500/20 text-purple-300 border-purple-500/30"
//                             >
//                               {video.duration}s
//                             </Badge>
//                             <div className="text-sm text-gray-400">Video #{index + 1}</div>
//                           </div>

//                           <div className="text-sm text-gray-300">
//                             <span className="text-gray-500">Creator:</span>{" "}
//                             <a
//                               href={video.user.url}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200"
//                             >
//                               {video.user.name}
//                             </a>
//                           </div>

//                           {video720p && (
//                             <motion.a
//                               href={video720p.link}
//                               download
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg hover:shadow-green-500/25"
//                             >
//                               <Download className="w-4 h-4" />
//                               Download 720p
//                             </motion.a>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   )
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Empty State */}
//         {!loading && videos.length === 0 && query && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-2xl mx-auto text-center"
//           >
//             <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
//               <CardContent className="p-12">
//                 <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
//                   <Video className="w-10 h-10 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-400 mb-3">No videos found</h3>
//                 <p className="text-gray-400 mb-6">Try different keywords or be more specific with your search terms.</p>
//                 <Button
//                   onClick={() => setQuery("")}
//                   variant="outline"
//                   className="border-white/20 text-white hover:bg-white/10"
//                 >
//                   Try Another Search
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Initial State */}
//         {!loading && videos.length === 0 && !query && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <div className="grid md:grid-cols-3 gap-6">
//               {[
//                 { icon: Search, title: "Search", desc: "Describe your perfect video" },
//                 { icon: Video, title: "Preview", desc: "Watch before you download" },
//                 { icon: Download, title: "Download", desc: "Get HD quality videos free" },
//               ].map((step, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 + i * 0.2 }}
//                 >
//                   <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
//                       <step.icon className="w-8 h-8 text-purple-400" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
//                     <p className="text-gray-400">{step.desc}</p>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ShortVidGen





"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Download, Search, Sparkles, Video, Zap, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { AppContext } from "@/context/AppContext"
import { useNavigate } from "react-router-dom"

function ShortVidGen() {
  const { token, loadCreditData } = useContext(AppContext)
  const [query, setQuery] = useState("")
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate=useNavigate()


  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/aivideo/api/videos?q=${query}`, {
        headers: {
          token: token, // or use "Authorization": `Bearer ${token}` if your backend expects that
        },
      })

      if (res.data.success) {
        setVideos(res.data.videos || [])
        // loadCreditData()
      } else {
        if (res.data.message === "You have no credits left") {
          navigate("/buycredit")
        } else {
          setError(res.data.message || "Failed to fetch videos")
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message
      if (errorMsg === "You have no credits left") {
        navigate("/buycredit")
      } else {
        setError(errorMsg)
      }
    } finally {
      setLoading(false)
      loadCreditData()
    }
  }

  const handleReset = () => {
    setQuery("")
    setVideos([])
    setError(null)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Helper to find 720p video file
  const getVideo720p = (videoFiles) => {
    return videoFiles.find((file) => file.width === 1280 && file.height === 720 && file.file_type === "video/mp4")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80  rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto text-center space-y-8 mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20"
            >
              AI-Powered Video Discovery
            </Badge>
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-7xl max-sm:text-4xl font-bold bg-gradient-to-r from-white via-purple-500 to-pink-200 bg-clip-text text-transparent leading-tight"
          >
            Create Videos from
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Text Prompts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your ideas into stunning videos instantly. Just describe what you want, and our AI will find the
            perfect high-quality footage for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              <span>HD Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              <span>Free Downloads</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
            <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your video... (e.g., 'sunset over mountains', 'city traffic at night')"
                    className="pl-12 h-14 text-lg bg-white/5 border-white/20 text-gray-400 placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={loading || !query.trim()}
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 w-5 h-5" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 w-5 h-5" />
                      Find Videos
                    </>
                  )}
                </Button>
              </div>

              {videos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex justify-center"
                >
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="text-red-400 border-red-400/50 hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
                  >
                    Clear Results
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>
        </motion.div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <Card className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-red-400 text-lg">{error}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto mb-8"
            >
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full max-w-sm mx-auto"
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl overflow-hidden w-full">
                      <div className="w-full h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                      <CardContent className="p-6 space-y-3">
                        <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse"></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Videos Grid */}
        <AnimatePresence>
          {videos.length > 0 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Found {videos.length} Amazing Videos</h2>
                <p className="text-gray-400">Click to preview, download in HD quality</p>
              </motion.div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                {videos.map((video, index) => {
                  const video720p = getVideo720p(video.video_files)

                  return (
                    <motion.div
                      key={video.id}
                      variants={itemVariants}
                      // whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full max-w-sm mx-auto"
                    >
                      <Card className="group bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500  w-full">
                        <div className="relative overflow-hidden">
                          <video
                            controls
                            poster={video.image}
                            className="w-full h-80 object-cover transition-transform duration-500 "
                          >
                            {video720p && <source src={video720p.link} type="video/mp4" />}
                            {!video720p && <source src={video.video_files[0]?.link} type="video/mp4" />}
                            Your browser does not support the video tag.
                          </video>
                        
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/20">
                              <Play className="w-3 h-3 mr-1" />
                              HD
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              {video.duration}s
                            </Badge>
                            <div className="text-sm text-gray-400">Video #{index + 1}</div>
                          </div>

                          <div className="text-sm text-gray-300">
                            <span className="text-gray-500">Creator:</span>{" "}
                            <a
                              href={video.user.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-400 hover:text-purple-300 underline transition-colors duration-200"
                            >
                              {video.user.name}
                            </a>
                          </div>

                          {video720p && (
                            <motion.a
                              href={video720p.link}
                              download
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg hover:shadow-green-500/25 w-full justify-center"
                            >
                              <Download className="w-4 h-4" />
                              Download 720p
                            </motion.a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && videos.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
              <CardContent className="p-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                  <Video className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-400 mb-3">No videos found</h3>
                <p className="text-gray-400 mb-6">Try different keywords or be more specific with your search terms.</p>
                <Button
                  onClick={() => setQuery("")}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Try Another Search
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Initial State */}
        {!loading && videos.length === 0 && !query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Search, title: "Search", desc: "Describe your perfect video" },
                { icon: Video, title: "Preview", desc: "Watch before you download" },
                { icon: Download, title: "Download", desc: "Get HD quality videos free" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.2 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ShortVidGen
