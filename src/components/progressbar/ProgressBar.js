import './progressbar.scss'

export default function ProgressBar({ isLoading }) {
    return (
        <>
            {isLoading &&
                <div className="progress-bar">
                    <div className="progress-bar-value"/>
                </div>
            }
        </>
    )
}
