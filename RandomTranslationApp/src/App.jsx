import React, { useState, useEffect } from 'react'
import { RefreshCw, ChevronDown, CheckCircle, XCircle } from 'lucide-react'

export default function RandomTranslationForm() {
  const [formData, setFormData] = useState({
    language: '',
    randomWord: '',
    meaning: '',
    teamSize: '1-50 people',
    location: 'New Zealand',
    message: '',
    agreeToPolicy: false
  })
  const [translationResult, setTranslationResult] = useState('')

  const wordMeaningMap = {
    apple: { en: 'a fruit', so: 'tufaax' },
    car: { en: 'a vehicle', so: 'gaari' },
    house: { en: 'a building', so: 'guri' },
    book: { en: 'a set of pages', so: 'buug' },
    water: { en: 'a liquid', so: 'biyo' },
  }

  useEffect(() => {
    generateRandomWord()
  }, [])

  const generateRandomWord = () => {
    const words = Object.keys(wordMeaningMap)
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setFormData(prevData => ({ ...prevData, randomWord }))
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.language || !formData.randomWord || !formData.meaning) {
      setTranslationResult('Please fill all required fields.')
      return
    }

    const correctMeaning = wordMeaningMap[formData.randomWord][formData.language]
    if (formData.meaning.toLowerCase() === correctMeaning.toLowerCase()) {
      setTranslationResult('Correct! Your translation is accurate.')
    } else {
      setTranslationResult(`Incorrect. The correct meaning is "${correctMeaning}".`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Random Translation</h1>
        <p className="text-white text-center mb-6">Test your language skills and get in touch!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-white mb-1">Select Language</label>
            <div className="relative">
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full bg-white rounded-xl p-3 text-gray-800 appearance-none"
              >
                <option value="">Choose Language</option>
                <option value="en">English</option>
                <option value="so">Somali</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="randomWord" className="block text-sm font-medium text-white mb-1">Random Word</label>
            <div className="relative">
              <input
                type="text"
                id="randomWord"
                name="randomWord"
                value={formData.randomWord}
                readOnly
                className="w-full bg-white rounded-xl p-3 text-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={generateRandomWord}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition duration-200"
                aria-label="Generate new word"
              >
                <RefreshCw className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="meaning" className="block text-sm font-medium text-white mb-1">Enter Meaning</label>
            <input
              type="text"
              id="meaning"
              name="meaning"
              value={formData.meaning}
              onChange={handleInputChange}
              className="w-full bg-white rounded-xl p-3 text-gray-800"
              placeholder="Your translation"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
          >
            Submit Translation
          </button>
        </form>
        
        {translationResult && (
          <div
            className={`mt-6 text-center p-4 rounded-xl flex items-center justify-center ${
              translationResult.includes('Correct')
                ? 'bg-green-600 bg-opacity-20 text-white'
                : 'bg-purple-600 bg-opacity-20 text-white'
            }`}
          >
            {translationResult.includes('Correct') ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            {translationResult}
          </div>
        )}
      </div>
    </div>
  )
}